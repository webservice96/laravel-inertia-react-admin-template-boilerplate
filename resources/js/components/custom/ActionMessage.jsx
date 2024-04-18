import { Transition } from "@headlessui/react";
import React from "react";

function ActionMessage({ on, className, children }) {
    return (
        <div className={className}>
            <Transition
                show={on}
                leave="transition ease-in duration-1000"
                leave-from-class="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="text-sm text-green-600 dark:text-green-400 font-bold">
                    {children}
                </div>
            </Transition>
        </div>
    );
}

export default ActionMessage;
