import Image from "next/image";
import profilePic from "../../public/profile-placeholder.png";

const ProfileImage = ({ url, width, height, className }: ProfileImageProps) => {
    if (url) {
        return (
            <Image
                className={className}
                src={url}
                width={width}
                height={height}
                alt="profile image object-fit-cover"
            />
        );
    } else {
        return (
            <Image
                className={className}
                src={profilePic}
                width={width}
                height={height}
                alt="profile image object-fit-cover"
            />
        );
    }
};

export interface ProfileImageProps {
    url?: string;
    width: number;
    height: number;
    className?: string;
}

export default ProfileImage;
