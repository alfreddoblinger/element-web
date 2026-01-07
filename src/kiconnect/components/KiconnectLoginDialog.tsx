import React, { useState } from "react";
import BaseDialog from "../../components/views/dialogs/BaseDialog";
import { clientLogin } from "../logic/login";
import type { Room } from "matrix-js-sdk/src/matrix";

type Props = {
    room: Room;
    onFinished: (success?: boolean) => void;
};

export default function KiconnectLoginDialog({ room, onFinished }: Props): JSX.Element {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (): Promise<void> => {
        try {
            await clientLogin(room, username, password);
            onFinished(true);
        } finally {
            setPassword(""); // sofort verwerfen
        }
    };

    return (
        <BaseDialog title="KIconnect Login" onFinished={onFinished}>
            <div style={{ padding: "16px 0", display: "grid", gap: 12 }}>
                <input
                    type="text"
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="mx_Dialog_buttons">
                <button className="mx_Dialog_primary" onClick={onSubmit}>
                    Login
                </button>
            </div>
        </BaseDialog>
    );
}
