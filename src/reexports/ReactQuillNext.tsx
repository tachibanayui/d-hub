// Since React Quill doesn't like Next.js SSR, we need to do this:
// https://github.com/zenoamaro/react-quill/issues/642#issuecomment-717661518

import dynamic from "next/dynamic";
import { LegacyRef, MutableRefObject, ReactPropTypes, useRef } from "react";
// Import QuillProps from the react-quill library if it provides such a type definition.
import ReactQuill, { ReactQuillProps } from "react-quill";

const DynamicReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill");

        return function RQW({
            forwardedRef,
            ...props
        }: ReactQuillProps & { forwardedRef: LegacyRef<ReactQuill> }) {
            return <RQ ref={forwardedRef} {...props} />;
        };
    },
    {
        ssr: false,
    }
);

export default function ReactQuillNext(
    props: ReactQuillProps & { innerRef: MutableRefObject<ReactQuill | null> }
) {
    return (
        <>
            <DynamicReactQuill {...props} forwardedRef={props.innerRef} />
        </>
    );
}
