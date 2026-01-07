import type { Room } from "matrix-js-sdk/src/matrix";

export function isTeamRoom(room: Room): boolean {
    return !!room.currentState?.getStateEvents("io.kiconnect.teamroom", "");
}
