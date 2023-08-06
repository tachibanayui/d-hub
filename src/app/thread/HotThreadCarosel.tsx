import ThreadListItem from "@/components/ThreadListItem";
import { Tag } from "@/models/tags.client";
import { getHotThreads } from "@/models/thread";
import { Thread } from "@/models/thread.client";
import { getUsersById } from "@/models/user";
import { idAsString } from "@/utils/mongoId";
import classNames from "classnames";
const HotThreadCarosel = async ({
    tagStore,
}: HotThreadCaroselProps) => {
    const hotThreads = await getHotThreads();
    const users = (await getUsersById(hotThreads.data.map((x) => x.userId))).map(x => idAsString(x));
    const userStore = new Map(users.map((x) => [x.id, x]));
    return (
        <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{ maxHeight: "500px" }}
        >
            <div className="carousel-inner">
                <div className="carousel-indicators">
                    {hotThreads.data.map((x, i) => (
                        <button
                            key={x.id}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={i}
                            className={classNames({ active: i === 0 })}
                            aria-current="true"
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>

                {hotThreads.data.map((x) => (
                    <div key={x.id} className="carousel-item active">
                        <ThreadListItem
                            authorName={userStore?.get(x.userId)?.name}
                            tagStore={tagStore}
                            hideActions
                            data={x}
                        />
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
    tagStore: Tag[];
}
