/**
 * @fileoverview Discord Integration for Vampire: The Masquerade Character Sheet
 * @version 1.3.1
 * @description Centralized Discord webhook utilities for sharing dice rolls, character actions,
 *             and game events to Discord channels. Provides webhook management, message formatting,
 *             and embed creation for VtM-specific content.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires databaseManager - Global database manager for webhook storage
 * @requires teal.min.js - Core utility library ($t) for VtM dice colors
 * @requires modalManager - Global modal dialog manager
 * @requires Bootstrap - For UI components and styling
 * 
 * @namespace DiscordIntegration
 * @description Main namespace for Discord integration functionality
 * 
 * @function getDiscordWebhook - Retrieves configured Discord webhook URL
 * @function isDiscordEnabled - Checks if Discord integration is enabled
 * @function setDiscordWebhook - Saves or clears Discord webhook URL
 * @function getCharacterName - Extracts character name from character sheet
 * @function sendToDiscord - Sends message or embed to Discord webhook
 * @function buildRollEmbed - Builds Discord embed for dice roll results
 * @function createWebhookModal - Creates webhook configuration modal
 * 
 * @typedef {Object} DiscordWebhook
 * @property {string} url - Webhook URL
 * @property {boolean} enabled - Whether integration is enabled
 * 
 * @typedef {Object} DiscordEmbed
 * @property {string} title - Embed title
 * @property {string} description - Embed description
 * @property {number} color - Embed color (hex)
 * @property {Array<Object>} fields - Embed fields
 * @property {Object} [footer] - Embed footer
 * @property {string} [timestamp] - Embed timestamp
 * 
 * @typedef {Object} RollData
 * @property {number} regularDice - Number of regular dice
 * @property {number} hungerDice - Number of hunger dice
 * @property {number} rouseDice - Number of rouse dice
 * @property {number} remorseDice - Number of remorse dice
 * @property {number} frenzyDice - Number of frenzy dice
 * @property {number} difficulty - Difficulty threshold
 * @property {number} successes - Number of successes
 * @property {string} resultPlain - Plain text result
 * @property {boolean} [rouseSuccess] - Rouse check success
 * @property {boolean} [remorseSuccess] - Remorse check success
 * @property {boolean} [frenzySuccess] - Frenzy check success
 * 
 * @typedef {Object} DiscordField
 * @property {string} name - Field name
 * @property {string} value - Field value
 * @property {boolean} [inline] - Whether field is inline
 * 
 * @typedef {Object} DiscordPayload
 * @property {string} [content] - Plain text content
 * @property {Array<DiscordEmbed>} [embeds] - Array of embeds
 * 
 * @example
 * // Get webhook URL
 * const webhook = await getDiscordWebhook();
 * 
 * // Send plain text message
 * await sendToDiscord('Character performed an action');
 * 
 * // Send dice roll embed
 * const embed = buildRollEmbed(rollData);
 * await sendToDiscord(embed);
 * 
 * // Set webhook URL
 * await setDiscordWebhook('https://discord.com/api/webhooks/...');
 * 
 * @since 1.0.0
 * @updated 1.3.1
 */

/*
 * discord-integration.js
 * Centralised Discord webhook utilities for Ledger.
 * These helpers were previously embedded in dice-overlay.js.
 */

// Import logger
import logger from '../core/utils/logger.js';

// Retrieve the currently configured Discord webhook URL (or null if not set)
export async function getDiscordWebhook() {
  try {
    // Use IndexedDB exclusively
    if (window.databaseManager) {
      return await window.databaseManager.getSetting('discordWebhook') || null;
    }
    
    throw new Error('No database manager available for Discord webhook retrieval');
  } catch (err) {
    logger.error('Failed to get Discord webhook:', err);
    return null;
  }
}

// Check if Discord integration is enabled
export async function isDiscordEnabled() {
  try {
    if (window.databaseManager) {
      return await window.databaseManager.getSetting('discordEnabled') !== 'false';
    }
    return false; // Default to disabled if no database manager
  } catch (err) {
    logger.error('Failed to check Discord enabled setting:', err);
    return false; // Default to disabled on error
  }
}

// Save (or clear, if falsy) the Discord webhook URL
export async function setDiscordWebhook(url) {
  try {
    if (url && url.trim()) {
      // Use IndexedDB exclusively
      if (window.databaseManager) {
        await window.databaseManager.setSetting('discordWebhook', url.trim());
        return;
      }
      
      throw new Error('No database manager available for Discord webhook storage');
    } else {
      // Use IndexedDB exclusively
      if (window.databaseManager) {
        await window.databaseManager.deleteSetting('discordWebhook');
        return;
      }
      
      throw new Error('No database manager available for Discord webhook deletion');
    }
  } catch (err) {
    logger.error('Failed to set Discord webhook:', err);
  }
}

// Best-effort helper to read the character's name from the sheet so we can include it in messages
export function getCharacterName() {
  const label = Array.from(document.querySelectorAll('.stat-label'))
    .find(l => l.textContent.trim().toLowerCase() === 'name');
  if (!label) return '';
  const parent = label.parentElement;

  // Case 1: transformed into a <textarea> by character-sheet.js
  const textarea = parent.querySelector('textarea');
  if (textarea && textarea.value && textarea.value.trim()) {
    return textarea.value.trim();
  }

  // Case 2: still a plain <span>
  const spanTexts = Array.from(parent.querySelectorAll('span'))
    .filter(s => s !== label && s.textContent.trim() !== '')
    .map(s => s.textContent.trim());
  if (spanTexts.length > 0) return spanTexts[0];

  return '';
}

// Send either a plain text message or an embed object to Discord via webhook
export async function sendToDiscord(contentOrEmbed) {
  // Check if Discord integration is enabled
  const discordEnabled = await isDiscordEnabled();
  if (!discordEnabled) {
    return; // Discord integration is disabled, don't send any messages
  }

  const webhook = await getDiscordWebhook();
  if (!webhook) return; // nothing to do

  let payload;
  if (typeof contentOrEmbed === 'string') {
    payload = { content: contentOrEmbed };
  } else if (typeof contentOrEmbed === 'object' && contentOrEmbed !== null) {
    payload = { embeds: [contentOrEmbed] };
  } else {
    return; // unsupported type
  }

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    logger.error('Failed to send Discord webhook', err);
  }
}

// Build a Discord embed structure based on a dice-roll result object
export function buildRollEmbed(rollData) {
  // Determine embed colour & roll type
  let embedColor;
  let rollType;

  if ((rollData.regularDice ?? 0) > 0 || (rollData.hungerDice ?? 0) > 0) {
    // Check for Difficulty and use it for color if present
    if (rollData.difficulty) {
      embedColor = rollData.successes >= rollData.difficulty ? 0x00ff00 : 0xff0000;
    } else {
      embedColor = rollData.successes > 0 ? 0x00ff00 : 0xff0000;
    }
    rollType = 'Dice Roll';
  } else if ((rollData.rouseDice ?? 0) > 0) {
    embedColor = parseInt($t.vtm.rouse_dice_color.replace('#', ''), 16);
    rollType = 'Rouse Check';
  } else if ((rollData.remorseDice ?? 0) > 0) {
    embedColor = parseInt($t.vtm.remorse_dice_color.replace('#', ''), 16);
    rollType = 'Remorse Check';
  } else if ((rollData.frenzyDice ?? 0) > 0) {
    embedColor = parseInt($t.vtm.frenzy_dice_color.replace('#', ''), 16);
    rollType = 'Frenzy Check';
  } else {
    embedColor = 0x787878; // fallback grey
    rollType = 'Roll';
  }

  // Build fields for Discord embed
  const fields = [];

  // Difficulty (if present, as column)
  if (rollData.difficulty) {
    fields.push({ name: 'Difficulty', value: String(rollData.difficulty), inline: true });
  }

  // Dice Pool (only show types with >0, as column)
  let dicePoolLines = [];
  if (rollData.regularDice > 0) dicePoolLines.push(`${rollData.regularDice} Regular`);
  if (rollData.hungerDice > 0) dicePoolLines.push(`${rollData.hungerDice} Hunger`);
  if (rollData.rouseDice > 0) dicePoolLines.push(`${rollData.rouseDice} Rouse`);
  if (rollData.remorseDice > 0) dicePoolLines.push(`${rollData.remorseDice} Remorse`);
  if (rollData.frenzyDice > 0) dicePoolLines.push(`${rollData.frenzyDice} Frenzy`);
  if (dicePoolLines.length > 0) {
    fields.push({ name: 'Dice Pool', value: dicePoolLines.join('\n'), inline: true });
  }

  // Results column: combine main result, Rouse, Remorse, Frenzy, and special outcomes
  let resultsLines = [];
  if (rollData.difficulty) {
    resultsLines.push(rollData.successes >= rollData.difficulty ? 'Success' : 'Failure');
  }
  if (rollData.regularDice > 0 || rollData.hungerDice > 0) {
    resultsLines.push(`${rollData.successes} Success${rollData.successes === 1 ? '' : 'es'}`);
  }
  // Special outcomes
  if (/Bestial Failure/i.test(rollData.resultPlain)) {
    resultsLines.push('Bestial Failure');
  }
  if (/Messy Critical/i.test(rollData.resultPlain)) {
    resultsLines.push('Messy Critical');
  }
  if (/Critical/i.test(rollData.resultPlain) && !/Messy Critical/i.test(rollData.resultPlain)) {
    resultsLines.push('Critical');
  }
  // Rouse
  if (rollData.rouseDice > 0) {
    const rouseMatch = rollData.resultPlain.match(/Rouse:\s*(Rerolled – check dice|Success|Fail)/i);
    let rouseResult = rouseMatch ? rouseMatch[1] : (rollData.rouseSuccess !== undefined ? (rollData.rouseSuccess ? 'Success' : 'Failure') : '');
    resultsLines.push(`Rouse: ${rouseResult}`);
  }
  // Remorse
  if (rollData.remorseDice > 0) {
    const remorseMatch = rollData.resultPlain.match(/Remorse:\s*(Success|Fail)/i);
    let remorseResult = remorseMatch ? remorseMatch[1] : (rollData.remorseSuccess !== undefined ? (rollData.remorseSuccess ? 'Success' : 'Failure') : '');
    resultsLines.push(`Remorse: ${remorseResult}`);
  }
  // Frenzy
  if (rollData.frenzyDice > 0) {
    const frenzyMatch = rollData.resultPlain.match(/Frenzy:\s*(Success|Fail)/i);
    let frenzyResult = frenzyMatch ? frenzyMatch[1] : (rollData.frenzySuccess !== undefined ? (rollData.frenzySuccess ? 'Success' : 'Failure') : '');
    resultsLines.push(`Frenzy: ${frenzyResult}`);
  }
  fields.push({ name: 'Results', value: resultsLines.join('\n'), inline: true });

  return {
    title: getCharacterName() ? `${getCharacterName()}'s ${rollType}` : `🎲 ${rollType}`,
    color: embedColor,
    fields,
    timestamp: new Date().toISOString()
  };
}

// Lazily create (and return) a Bootstrap modal that lets the user set their webhook URL
export function createWebhookModal() {
  const content = `
    <div class="mb-3">
      <label for="discordWebhookInput" class="form-label">Webhook URL</label>
      <input type="url" class="form-control" id="discordWebhookInput" placeholder="https://discord.com/api/webhooks/...">
    </div>
  `;

  const footer = `
    <button type="button" class="btn theme-btn-secondary" id="deleteDiscordWebhook">Delete</button>
    <button type="button" class="btn theme-btn-primary" id="saveDiscordWebhook">Save</button>
  `;

  const { modalElement, modalInstance } = modalManager.showCustom({
    title: 'Discord Webhook',
    content,
    footer,
    size: 'default',
    centered: true
  }, (element, instance) => {
    // Set up event handlers
    element.querySelector('#saveDiscordWebhook').addEventListener('click', async () => {
      const url = element.querySelector('#discordWebhookInput').value.trim();
      await setDiscordWebhook(url);
      instance.hide();
    });

    element.querySelector('#deleteDiscordWebhook').addEventListener('click', async () => {
      await setDiscordWebhook(null);
      instance.hide();
    });
  });

  return modalElement;
} 