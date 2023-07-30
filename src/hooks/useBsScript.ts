import { useEffect } from "react";

export default function useBsScript() {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
}
