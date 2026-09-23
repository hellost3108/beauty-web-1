import CmsSections from "@/components/cms/CmsSections";
import FAQ from "@/views/FAQ";

export default function Page() {
    return (
        <CmsSections modules={["info"]}>
            <FAQ />
        </CmsSections>
    );
}
