import { getTags } from "@/models/tag";
import NewThreadWizard from "./NewThreadWizard";
import { getSession } from "@/reexports/nextAuthReact";
import { getServerSession } from "next-auth/next";
import { Profile, getProfile } from "@/models/user";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/auth";

const NewThreadPage = async () => {
    const tags = await getTags();
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect("/login");
    }

    const pfp = await getProfile(session?.user.id);
    if (!pfp) {
        return redirect("/login");
    }

    (pfp as any).id = pfp._id.toString();
    delete (pfp as any)._id;

    return <NewThreadWizard tags={tags} userProfile={pfp as Profile} />;
};

export default NewThreadPage;
