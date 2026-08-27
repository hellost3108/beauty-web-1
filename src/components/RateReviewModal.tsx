
import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";

export function RateReviewModal() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        console.log("Submitted:", { rating, feedback });
        toast.success("Cảm ơn bạn đã gửi đánh giá!");
        // Reset and close
        setRating(0);
        setFeedback("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="rounded-full bg-[#fceef2] text-[#e7406e] hover:bg-[#e7406e] hover:text-white border px-6 transition-all shadow-sm font-display"
                >
                    Đánh Giá
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-[20px] p-6 bg-white">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-bold flex justify-between items-center text-[#111111] font-display">
                        Đánh Giá Sản Phẩm!
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 mt-2 font-body">
                        Giúp chúng tôi cải thiện sản phẩm tốt hơn bằng cách đánh giá tại đây!
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-center gap-4 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="focus:outline-none transition-transform hover:scale-110"
                        >
                            <Star
                                className={`w-8 h-8 ${star <= rating
                                        ? "fill-[#e7406e] text-[#e7406e]" // Filled star
                                        : "text-[#6c757d]" // Empty star (outline/gray)
                                    } transition-colors duration-200`}
                                strokeWidth={1.5}
                            />
                        </button>
                    ))}
                </div>

                <div className="space-y-3 mb-6">
                    <label className="text-sm font-semibold text-[#111111] font-display">
                        Bạn có muốn chia sẻ thêm không?
                    </label>
                    <Textarea
                        placeholder="Nhập nhận xét của bạn"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="min-h-[100px] rounded-xl border-gray-200 resize-none focus:border-[#e7406e] focus:ring-[#e7406e] font-body"
                    />
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-3 sm:space-x-0">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="w-full rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 h-11 font-display"
                        >
                            Huỷ
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleSubmit}
                        className="w-full rounded-xl bg-[#e7406e] hover:bg-[#d63060] text-white h-11 shadow-md hover:shadow-lg transition-all font-display"
                    >
                        Gửi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
