import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import userEvent from "@testing-library/user-event";
import CreatePlaylistForm from "./index";

const testRender = () =>
	render(
		<Provider store={store}>
			<CreatePlaylistForm />
		</Provider>
	);

describe("Render Form Component", () => {
	beforeEach(testRender);
	afterEach(cleanup);

	it("Component Rendered Successfully", () => {
		const titleInput = screen.getByPlaceholderText(/Add a title here/i);
		const descInput = screen.getByPlaceholderText(/Add a description here/i);
		const formButton = screen.getByRole("button", {
			name: /Create/i,
		});

		expect(titleInput).toBeInTheDocument();
		expect(descInput).toBeInTheDocument();
		expect(formButton).toBeInTheDocument();
	});

	it("Form Input received value", () => {
		const titleInput = screen.getByPlaceholderText(/Add a title here/i);
		const descInput = screen.getByPlaceholderText(/Add a description here/i);

		userEvent.type(titleInput, "Example of Title");
		expect(titleInput).toHaveValue("Example of Title");

		userEvent.type(descInput, "Example of Description");
		expect(descInput).toHaveValue("Example of Description");
	});
});