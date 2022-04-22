import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import Card from "./index";

const Data = {
	images: "https://i.scdn.co/image/ab67616d0000b2737d6f5f316cb00b678e32a207",
	title: "This is Title",
	artist: "This is Artist",
	toggle: "test",
	select: "test",
};

const testRender = () =>
	render(
		<Provider store={store}>
			<Card
				imagesUrl={Data.images}
				title={Data.title}
				artist={Data.artist}
				toggleSelect={Data.toggle}
				select={Data.select}
			/>
		</Provider>
	);

describe("Render Card Component", () => {
	beforeEach(testRender);
	afterEach(cleanup);

	it("Component Rendered Successfully", () => {
		const images = screen.getAllByAltText(Data.title);
		const title = screen.getByText(Data.title);
		const artist = screen.getByText(Data.artist);

		expect(images).toBeTruthy();
		expect(title).toBeInTheDocument();
		expect(artist).toBeInTheDocument();
	});
});