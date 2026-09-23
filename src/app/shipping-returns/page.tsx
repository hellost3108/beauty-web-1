import CmsSections from "@/components/cms/CmsSections";
import ShippingReturns from "@/views/ShippingReturns";

export default function Page() {
    return (
        <CmsSections modules={["info"]}>
            <ShippingReturns />
        </CmsSections>
    );
}
