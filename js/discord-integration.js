/*
 * discord-integration.js
 * Centralised Discord webhook utilities for Ledger.
 * These helpers were previously embedded in dice-overlay.js.
 */

// Persist the webhook URL in localStorage so the setting survives page reloads
const DISCORD_WEBHOOK_STORAGE_KEY = "ledger-discord-webhook";

// Retrieve the currently configured Discord webhook URL (or null if not set)
export function getDiscordWebhook() {
  return localStorage.getItem(DISCORD_WEBHOOK_STORAGE_KEY) || null;
}

// Save (or clear, if falsy) the Discord webhook URL
export function setDiscordWebhook(url) {
  if (url && url.trim()) {
    localStorage.setItem(DISCORD_WEBHOOK_STORAGE_KEY, url.trim());
  } else {
    localStorage.removeItem(DISCORD_WEBHOOK_STORAGE_KEY);
  }
}

// Best-effort helper to read the character's name from the sheet so we can include it in messages
export function getCharacterName() {
  const label = Array.from(document.querySelectorAll('.stat-label'))
    .find(l => l.textContent.trim().toLowerCase() === 'name');
  if (!label) return '';
  const parent = label.parentElement;

  // Case 1: transformed into an <input> by character-sheet.js
  const input = parent.querySelector('input');
  if (input && input.value && input.value.trim()) {
    return input.value.trim();
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
  const webhook = getDiscordWebhook();
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
    // eslint-disable-next-line no-console
    console.error('Failed to send Discord webhook', err);
  }
}

// Build a Discord embed structure based on a dice-roll result object
export function buildRollEmbed(rollData) {
  // Determine embed colour & roll type
  let embedColor;
  let rollType;

  if ((rollData.regularDice ?? 0) > 0 || (rollData.hungerDice ?? 0) > 0) {
    embedColor = rollData.successes > 0 ? 0x00ff00 : 0xff0000;
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

  return {
    title: rollData.characterName ? `${rollData.characterName}'s ${rollType}` : `🎲 ${rollType}`,
    color: embedColor,
    fields: [
      { name: 'Dice Pool', value: rollData.poolText, inline: true },
      { name: 'Result',    value: rollData.resultPlain, inline: true }
    ],
    timestamp: new Date().toISOString()
  };
}

// Lazily create (and return) a Bootstrap modal that lets the user set their webhook URL
export function createWebhookModal() {
  const modalHtml = `
    <div class="modal fade" id="discordWebhookModal" tabindex="-1" aria-labelledby="discordWebhookLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="discordWebhookLabel">Discord Webhook</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="discordWebhookInput" class="form-label">Webhook URL</label>
              <input type="url" class="form-control" id="discordWebhookInput" placeholder="https://discord.com/api/webhooks/...">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="deleteDiscordWebhook">Delete</button>
            <button type="button" class="btn btn-primary" id="saveDiscordWebhook">Save</button>
          </div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  return document.getElementById('discordWebhookModal');
} 