export const ALL = "ALL";
export const OPEN = "OPEN";
export const COMPLETED = "COMPLETED";

export class View {
    constructor(view) {
        if (![ALL, OPEN, COMPLETED].includes(view)) {
            throw new Error(`View must be ${ALL}, ${OPEN} or ${COMPLETED}`);
        }

        this._view = view;
    }

    static createDefaultView() {
        return new View(ALL);
    }

    toString() {
        return this._view.toString();
    }

    equals(other) {
        return this.toString() === other.toString();
    }
}
