import { Anchor, Text } from "@mantine/core"

/** Same-origin link back to The Ledger dashboard after exporting JSON. */
export default function LedgerReturnLink({ compact = false }: { compact?: boolean }) {
    return (
        <Anchor href="/" underline="hover" c="grape.3">
            <Text
                component="span"
                size={compact ? "xs" : "sm"}
                style={{
                    fontFamily: "Inter, Segoe UI, sans-serif",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase"
                }}
            >
                {compact ? "The Ledger" : "Return to The Ledger"}
            </Text>
        </Anchor>
    )
}
