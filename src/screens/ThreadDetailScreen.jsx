import { useParams } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import { Container } from 'react-bootstrap';

export default function ThreadDetailScreen() {
    const { threadId } = useParams();
    return (
        <DefaultLayout>
            <Container>
                Thread details: id = {threadId}
                oihfa
                fas
                daf\\sda

                <a href="fsa
                f
                "></a>

                asd
            </Container>
        </DefaultLayout>
    )
}