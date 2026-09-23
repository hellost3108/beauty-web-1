import CmsSections from "@/components/cms/CmsSections";
import Terms from "@/views/Terms";

export default function Page() {
    return (
        <CmsSections modules={["info"]}>
            <Terms />
        </CmsSections>
    );
}
