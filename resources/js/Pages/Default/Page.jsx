import AppLayout from "@/components/custom/appLayout";
import { Head } from "@inertiajs/react";
import { IconPlanet } from "@tabler/icons-react";

function Page() {
    return (
        <AppLayout pageTitle={"Dashboard"}>
            <Head title="Dashboard" />
            <div className="h-[calc(100vh-101px)]">
                <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
                    <IconPlanet size={72} />
                    <h1 className="text-4xl font-bold leading-tight">
                        Components Coming Soon👀
                    </h1>
                    <p className="text-center text-muted-foreground">
                        Add your page content here. <br />
                        Stay tuned though!
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}

export default Page;
