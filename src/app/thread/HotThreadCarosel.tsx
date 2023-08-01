import ThreadListItem from "@/components/ThreadListItem";
import { Tag } from "@/models/tags.client";
import { Thread } from "@/models/thread.client";
const HotThreadCarosel = ({ hotThreads, tagStore }: HotThreadCaroselProps) => {
    return (
        <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{ maxHeight: "500px" }}
        >
            <div className="carousel-inner">
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    />
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    />
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    />
                </div>

                {hotThreads.map((x) => (
                    <div key={x.id} className="carousel-item active">
                        <ThreadListItem
                            authorName="TODO"
                            tagStore={tagStore}
                            hideActions
                            data={x}
                        />
                        {/* <img
                            src="https://res.cloudinary.com/depipxp3j/image/upload/f_auto,q_auto/cld-sample-5"
                            className="d-block w-100 img-fluid"
                            alt="..."
                        /> */}
                    </div>
                ))}
            </div>

            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};
 
export default HotThreadCarosel;

export interface HotThreadCaroselProps {
    hotThreads: Thread[];
    tagStore: Tag[];
}