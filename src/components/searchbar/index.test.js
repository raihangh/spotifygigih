import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import userEvent from "@testing-library/user-event";
import SearchBar from "./index";

const testRender = () =>
	render(
		<Provider store={store}>
			<SearchBar />
		</Provider>
	);

describe("Render Search Bar Component", () => {
	beforeEach(testRender);
	afterEach(cleanup);

	it("Component Rendered Successfully", () => {
		const searchInput = screen.getByPlaceholderText(
			/Search your Fav Songs.../i
		);
		const searchButton = screen.getByRole("button", {
			name: /Search/i,
		});

		expect(searchInput).toBeInTheDocument();
		expect(searchButton).toBeInTheDocument();
	});

	it("Search Input received value", () => {
		const searchInput = screen.getByPlaceholderText(
			/Search your Fav Songs.../i
		);
		userEvent.type(searchInput, "Honne");
		expect(searchInput).toHaveValue("Honne");
	});
});