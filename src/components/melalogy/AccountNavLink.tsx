"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const AccountNavLink = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getSession().then(({ data }) => setIsLoggedIn(!!data.session));
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session);
        });
        return () => subscription.subscription.unsubscribe();
    }, []);

    return (
        <Link href={isLoggedIn ? "/account" : "/login"} className="mlg-nav__icon" aria-label="Tài khoản">
            <User />
        </Link>
    );
};

export default AccountNavLink;
