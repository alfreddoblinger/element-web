import { MatrixClientPeg } from "../../MatrixClientPeg";
import { EventType, type Room } from "matrix-js-sdk/src/matrix";

/**
 * Globaler Client-Logout:
 * - schließt ALLE invited + joined Räume
 * - AUSNAHME: Bot-/Teamraum (State io.kiconnect.teamroom)
 * - sendet danach !logout in den Botraum
 */
export async function clientLogoutAll(): Promise<void> {
    const client = MatrixClientPeg.safeGet();
    const rooms: Room[] = client.getRooms();

    let botRoomId: string | null = null;
    const leavePromises: Promise<unknown>[] = [];

    for (const room of rooms) {
        const isBotRoom = !!room.currentState?.getStateEvents(
            "io.kiconnect.teamroom",
            ""
        );

        if (isBotRoom) {
            botRoomId = room.roomId;
            continue;
        }

        const membership = room.getMyMembership();
        if (membership === "join" || membership === "invite") {
            leavePromises.push(client.leave(room.roomId));
        }
    }

    // Räume parallel schließen (robust)
    await Promise.allSettled(leavePromises);

    // Server informieren
    if (botRoomId) {
        await client.sendEvent(botRoomId, EventType.RoomMessage, {
            msgtype: "m.text",
            body: "!logout",
        });
    }
}
