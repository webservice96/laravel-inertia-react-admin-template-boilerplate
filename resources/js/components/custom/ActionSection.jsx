import React from "react";
import SectionTitle from "./SectionTitle";

export default function ActionSection({ title, description, children }) {
    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <SectionTitle title={title} description={description} />

            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="px-4 py-5 border shadow sm:p-6 sm:rounded-tl-md sm:rounded-tr-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
