import classNames from "classnames";
import React from "react";
import SectionTitle from "./SectionTitle";

function FormSection({
    onSubmit,
    renderActions,
    title,
    description,
    children,
}) {
    const hasActions = !!renderActions;
    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <SectionTitle title={title} description={description} />

            <div className="mt-5 md:mt-0 md:col-span-2">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <div
                        className={classNames(
                            "px-4 py-5 border shadow sm:p-6",
                            hasActions
                                ? "sm:rounded-tl-md sm:rounded-tr-md"
                                : "sm:rounded-md"
                        )}
                    >
                        <div className="grid grid-cols-6 gap-6">{children}</div>
                    </div>

                    {hasActions && (
                        <div className="flex items-center justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
                            {renderActions?.()}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default FormSection;
