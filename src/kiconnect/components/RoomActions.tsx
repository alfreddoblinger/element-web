import React from "react";
import type { Room } from "matrix-js-sdk/src/matrix";
import { isTeamRoom } from "../logic/roomState";
import { clientLogoutAll } from "../logic/logout";
import { openKiconnectLoginDialog } from "../logic/login";
import "../styles/RoomActions.css";

type Props = {
    room: Room;
};

export function KiconnectRoomActions({ room }: Props): JSX.Element | null {
    if (!isTeamRoom(room)) return null;

    const onLogout = async (): Promise<void> => {
        await clientLogoutAll();
    };

    const onLogin = (): void => {
        openKiconnectLoginDialog(room);
    };

    return (
        <div className="kiconnect-room-actions">
            <div className="kiconnect-room-actions-divider" />
            <button onClick={onLogin}>Login</button>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}
