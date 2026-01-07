import type { Room } from "matrix-js-sdk/src/matrix";
import { MatrixClientPeg } from "../../MatrixClientPeg";
import Modal from "../../Modal";
import KiconnectLoginDialog from "../components/KiconnectLoginDialog";

/**
 * Öffnet den Login-Dialog
 */
export function openKiconnectLoginDialog(room: Room): void {
    Modal.createDialog(KiconnectLoginDialog, { room });
}

/**
 * Sendet Login-Daten als Custom Event
 */
export async function clientLogin(
    room: Room,
    username: string,
    password: string,
): Promise<void> {
    const client = MatrixClientPeg.get();
    if (!client) return;

    await client.sendEvent(room.roomId, "io.kiconnect.login", {
        username,
        password,
    });
}
