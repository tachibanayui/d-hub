import { getTags } from "@/models/tag";
import NewThreadWizard from "./NewThreadWizard";
import { getSession } from "@/reexports/nextAuthReact";
import { getServerSession } from "next-auth/next";
import { ProfileDB, getOrCreateProfile } from "@/models/user";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/auth";
import { idAsString } from "@/utils/mongoId";

const NewThreadPage = async () => {
    const [tags, session] = await Promise.all([getTags(), getServerSession(authOptions)]);
    if (!session) {
        return redirect("/login");
    }

    const pfp = await getOrCreateProfile(session?.user.id);
    if (!pfp) {
        return redirect("/login");
    }

    const pfp2 = idAsString(pfp);
    return <NewThreadWizard tags={tags} userProfile={pfp2} />;
};

export default NewThreadPage;
