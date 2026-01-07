import type { Room } from "matrix-js-sdk/src/matrix";
import { MatrixClientPeg } from "../../MatrixClientPeg";

export function logoutFromRoom(room: Room): void {
    const client = MatrixClientPeg.safeGet();
    client.leave(room.roomId);
}
