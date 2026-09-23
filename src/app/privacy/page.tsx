import CmsSections from "@/components/cms/CmsSections";
import Privacy from "@/views/Privacy";

export default function Page() {
    return (
        <CmsSections modules={["info"]}>
            <Privacy />
        </CmsSections>
    );
}
