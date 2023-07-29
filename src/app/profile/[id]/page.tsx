import { getProfile, getUserById } from "@/models/user";
import ProfileEditor from "./ProfileEditor";
import ProfileImageEditor from "./ProfileImageEditor";
import { notFound } from "next/navigation";
import Loading from "./loading";

const ProfilePage = async ({ params }: ProfilePageProps) => {
    const pfp = await getProfile(params.id);
    if (!pfp) {
        return notFound();
    }

    const { _id, role, profileImg, dob, ...rest } = pfp;

    const user = await getUserById(params.id);
    if (!user) {
        return notFound();
    }

    const profile = {
        ...rest,
        username: user.name,
        email: user.email,
        dob: dob?.toISOString().split("T")[0],
    }

    const id = _id.toString();
        
    return (
        <div className="row">
            <div className="col-xl-4">
                <ProfileImageEditor profileId={id} img={user.image} />
            </div> 
            <div className="col-xl-8">
                <ProfileEditor profileId={id} profileData={profile} email={user.email} />
            </div>
        </div>
    );
};

export default ProfilePage;

interface ProfilePageProps {
    params: {
        id: string;
    }
}
