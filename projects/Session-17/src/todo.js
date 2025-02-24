class ToDo {
    #id;
    #title;
    #description;
    #dueDate;
    #dateCompleted;

    constructor(id, title, description, dueDate) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#dueDate = new Date(dueDate);
        this.#dateCompleted = null;
    }

    getId() {
        return this.#id;
    }

    getTitle() {
        return this.#title;
    }

    getDescription() {
        return this.#description;
    }

    getDueDate() {
        return this.#dueDate;
    }

    getDateCompleted() {
        return this.#dateCompleted;
    }

    setTitle(title) {
        this.#title = title;
    }

    setDescription(description) {
        this.#description = description;
    }

    setDueDate(dueDate) {
        this.#dueDate = new Date(dueDate);
    }

    complete() {
        this.#dateCompleted = new Date();
    }
}

export default ToDo;
