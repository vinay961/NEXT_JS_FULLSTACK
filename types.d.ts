import { Connection } from "mongoose";

declare global {
    var mongoose : {
        ctn : Connection | null;
        promise : Promise<Connection> | null;
    };
}

export {}
