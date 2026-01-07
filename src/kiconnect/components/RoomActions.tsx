import React from "react";
import type { Room } from "matrix-js-sdk/src/matrix";
import { isTeamRoom } from "../logic/roomState";
import { logoutFromRoom } from "../logic/logout";
import "../styles/RoomActions.css";

type Props = {
    room: Room;
};

export function KiconnectRoomActions({ room }: Props): JSX.Element | null {
    if (!isTeamRoom(room)) return null;

    const onLogout = (): void => {
        logoutFromRoom(room);
    };

    return (
        <div className="kiconnect-room-actions">
            <div className="kiconnect-room-actions-divider" />
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}
