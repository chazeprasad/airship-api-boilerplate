import { Paper } from "src/paperboat/core";
import { Message } from "./message";
import { Status } from "./status";

export class ExceptionHandler extends Paper {

    public static RecordNotFound (res: any, message:string = Message.NOTE_FOUND ) {
        res.status(Status.NOT_FOUND).json(message)
    }

}