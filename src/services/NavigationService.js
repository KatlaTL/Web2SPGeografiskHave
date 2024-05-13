import { db } from "@/config/firebase";
import { collection, getDocs, orderBy, query } from "@firebase/firestore";

export const getTopNavigationMenu = async () => {
    try {
        const navBarRef = collection(db, "navBar");

        const navBarQuery = query(navBarRef, orderBy("menuOrder"));

        const querySnapshot = await getDocs(navBarQuery);

        const result = [];

        for (const doc of querySnapshot.docs) {
            const subCollectionRef = collection(db, doc.ref.path + "/subNavigation");
            const subQuerySnapshot = await getDocs(subCollectionRef);

            result.push({
                id: doc.id,
                ...doc.data(),
                subNavigation: subQuerySnapshot.docs.map(doc => doc.data())
            });
        };

        return {
            result,
            error: null
        };
    } catch (err) {
        return {
            result: null,
            error: err
        };
    }
}

export const populateRoutes = async (router, routeName = null) => {
    try {
        if (!router || !router.addRoute) {
            throw "Router missing";
        }

        if (routeName) {
            router.removeRoute(routeName);
        }

        const navBar = await getTopNavigationMenu();

        if (navBar.result) {
            navBar.result.forEach(routeData => {
                const componentName = routeData?.routerComponentName || "ErrorView.vue";
                const componentPath = "../views/" + componentName;

                router.addRoute({
                    path: routeData.routerPath,
                    name: routeData.routerName,
                    meta: routeData.routerMeta,
                    component: () => import(/* @vite-ignore */ componentPath), // Added the vite ignore to remove warning that Vite can't analyse the dynamic import
                    ...(routeData.subNavigation.length > 0 && {
                        children: routeData.subNavigation.map(subNav => {
                            return {
                                path: subNav?.routerPath || "/deadlink",
                                name: subNav?.routerName || "dummy link",
                            }
                        })
                    })
                })
            })
        }
    } catch (err) {
        console.error(err);
        return {
            error: err
        };
    }
}