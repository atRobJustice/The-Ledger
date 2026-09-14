import { Text } from "@mantine/core"
import { getContentPackLabel, isSanguinePack } from "~/utils/contentPack"

/** One-line notice when the Sanguine Frontier Core+PG pack is active. */
export default function ContentPackNotice() {
    if (!isSanguinePack()) return null
    const label = getContentPackLabel()
    if (!label) return null
    return (
        <Text
            data-testid="content-pack-notice"
            ta="center"
            size="sm"
            c="grape.3"
            mb="sm"
            style={{
                fontFamily: "Inter, Segoe UI, sans-serif",
                letterSpacing: "0.04em"
            }}
        >
            {label}
        </Text>
    )
}
