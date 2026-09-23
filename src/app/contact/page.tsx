import CmsSections from "@/components/cms/CmsSections";
import Contact from "@/views/Contact";

export default function Page() {
    return (
        <CmsSections modules={["info"]}>
            <Contact />
        </CmsSections>
    );
}
