type DefaultErrorTypes = "error" | "info" | "success" | "warning";

interface DefaultParameters {
	statusCode?: number;
	message: string;
	type: DefaultErrorTypes;
}

class DefaultError extends Error {
	statusCode?: number;
	type: DefaultErrorTypes;

	constructor(
		error: DefaultParameters | DefaultError,
		genericError?: DefaultParameters,
	) {
		const errorToSend = error.type ? error : (genericError ?? error);

		super(errorToSend.message);
		this.name = "DefaultError";

		this.statusCode = errorToSend.statusCode;
		this.type = errorToSend.type;
	}

	formatToSend() {
		return {
			type: this.type,
			message: this.message,
		};
	}
}

export { DefaultError };
