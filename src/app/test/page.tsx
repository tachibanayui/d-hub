import SpinnerPage from "@/components/SpinnerPage";
import { Suspense } from "react";

const TestPage = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return (
        <main>
            <h1>Just wait a moment!</h1>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
                <Suspense key={x} fallback={"loading"}>
                    <Inner
                        title={`Outer ${x}`}
                        wait={1000 * x}
                        innerWait={1000 * x}
                        data={`Inner ${x}`}
                    />
                </Suspense>
            ))}
        </main>
    );
};

const Inner = async (props: NestedWait) => {
    const { title, wait } = props;
    await new Promise((resolve) => setTimeout(resolve, wait));

    return (
        <div>
            <h1>
                {title}:{" "}
                <Suspense fallback="Inner loading...">
                    <InnerInner {...props} />
                </Suspense>
            </h1>
        </div>
    );
};

const InnerInner = async ({ innerWait, data }: NestedWait) => {
    await new Promise((resolve) => setTimeout(resolve, innerWait));
    return (
        <i>{data}</i>
    );
}


interface NestedWait {
    title: string;
    wait: number;
    data: string;
    innerWait: number;
}

export default TestPage;
