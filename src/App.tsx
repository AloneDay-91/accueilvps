import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge"
import {SquareArrowOutUpRight} from "lucide-react";
import {Dialog, DialogContent, DialogTrigger} from "@radix-ui/react-dialog";
import {Footer} from "@/components/Footer";
import {Navbar} from "@/components/Navbar.tsx";

export default function App() {
    return (
        <div className="flex flex-col items-center mx-24">
            <Navbar/>
            <br/>
            <div className="max-w-screen-2xl w-full">
                <h1 className="text-left w-full text-2xl font-semibold py-6">Mes travaux</h1>
                <div>
                    <p className="text-muted-foreground text-xl py-2">
                        Semestre 1
                    </p>
                    <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>R112 - Intégration</CardTitle>
                                <CardDescription>Travaux en intégration</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <ul className="flex flex-col items-center gap-1">
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r112/sequence1"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 1</h2>
                                                <p className="text-sm text-muted-foreground">Batman</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r112/sequence2"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 2</h2>
                                                <p className="text-sm text-muted-foreground">Yoko's Kitchen</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r112/sequence3"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 3</h2>
                                                <p className="text-sm text-muted-foreground">Mr Potato</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r112/sequence4"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 4</h2>
                                                <p className="text-sm text-muted-foreground">John Doe</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r112/sequence5"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 5</h2>
                                                <p className="text-sm text-muted-foreground">Arboretum</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r112/sequence6"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 6</h2>
                                                <p className="text-sm text-muted-foreground">Gamers</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center gap-4">
                                    <p className="text-sm text-muted-foreground">Technologies utilisées : </p>
                                    <ul className="flex items-center gap-1">
                                        <li>
                                            <Badge variant="outline">HTML</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">CSS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">JS</Badge>
                                        </li>
                                    </ul>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>R113 - Développement</CardTitle>
                                <CardDescription>Travaux en développement</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <ul className="flex flex-col items-center gap-1">
                                        <a href="#"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <p className="text-sm text-muted-foreground">Rien pour le moment</p>
                                            </div>
                                        </a>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div>
                                    <ul className="flex items-center gap-1">
                                        <li>
                                            <Badge variant="outline">HTML</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">PHP</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">SQL</Badge>
                                        </li>
                                    </ul>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <div>
                    <p className="text-muted-foreground text-xl py-2 mt-24">
                        Semestre 2
                    </p>
                    <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>R212 - Intégration</CardTitle>
                                <CardDescription>Travaux en intégration</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <ul className="flex flex-col items-center gap-1">
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence1/monopoly.html"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 1</h2>
                                                <p className="text-sm text-muted-foreground">Monopoly</p>
                                            </div>
                                            <div>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence2"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 2</h2>
                                                <p className="text-sm text-muted-foreground">Hony Tawk</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence3"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 3</h2>
                                                <p className="text-sm text-muted-foreground">Calculatrice</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                        <Dialog>
                                            <DialogTrigger
                                                className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                                <div className="">
                                                    <h2 className="uppercase font-semibold">Séquence 4</h2>
                                                    <p className="text-sm text-muted-foreground">TD javascript</p>
                                                </div>
                                                <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                    <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="w-full">
                                                <div
                                                    className="p-12 border border-1 rounded-lg w-full flex items-center justify-between">
                                                    <a href="http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence4/exercice1.html">
                                                        <Button>Exercice 1</Button>
                                                    </a>
                                                    <a href="http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence4/exercice2.html">
                                                        <Button>Exercice 2</Button>
                                                    </a>
                                                    <a href="http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence4/exercice3.html">
                                                        <Button>Exercice 3</Button>
                                                    </a>
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence5"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 5</h2>
                                                <p className="text-sm text-muted-foreground">Parallax</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r212/sequence6"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 6</h2>
                                                <p className="text-sm text-muted-foreground">Wow.js</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center gap-4">
                                    <p className="text-sm text-muted-foreground">Technologies utilisées : </p>
                                    <ul className="flex items-center gap-1">
                                        <li>
                                            <Badge variant="outline">HTML</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">CSS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">JS</Badge>
                                        </li>
                                    </ul>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>R213 - Développement</CardTitle>
                                <CardDescription>Travaux en développement</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <ul className="flex flex-col items-center gap-1">
                                        <a href="#"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <p className="text-sm text-muted-foreground">Rien pour le moment</p>
                                            </div>
                                        </a>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div>
                                    <ul className="flex items-center gap-1">
                                        <li>
                                            <Badge variant="outline">HTML</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">PHP</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">SQL</Badge>
                                        </li>
                                    </ul>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>R203 - Accessibilité</CardTitle>
                                <CardDescription>Travaux en Accessibilité</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <ul className="flex flex-col items-center gap-1">
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r203/sequence1"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 1</h2>
                                                <p className="text-sm text-muted-foreground">Réservation</p>
                                            </div>
                                        </a>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div>
                                    <ul className="flex items-center gap-1">
                                        <li>
                                            <Badge variant="outline">HTML</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">PHP</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">SQL</Badge>
                                        </li>
                                    </ul>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <div>
                    <p className="text-muted-foreground text-xl py-2 mt-24">
                        Semestre 3
                    </p>
                    <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>R312 - Intégration</CardTitle>
                                <CardDescription>Travaux en intégration</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <ul className="flex flex-col items-center gap-1">
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r312/sequence1/index.html"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 1</h2>
                                                <p className="text-sm text-muted-foreground">Toy Story</p>
                                            </div>
                                            <div>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r312/sequence2/index.html"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 2</h2>
                                                <p className="text-sm text-muted-foreground">Chat</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                        <a href="http://mmi23f03.mmi-troyes.fr/travaux/r312/sequence3/exo2.html" className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 3</h2>
                                                <p className="text-sm text-muted-foreground">Drag</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                        <a href="http://mmi23f03.mmi-troyes.fr/scss/" className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Sass/SCSS</h2>
                                                <p className="text-sm text-muted-foreground">Café</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center gap-4 overflow-x-scroll">
                                    <p className="text-sm text-muted-foreground">Technologies utilisées : </p>
                                    <ul className="flex items-center gap-1">
                                        <li>
                                            <Badge variant="outline">HTML</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">CSS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">JS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">PHP</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">JSON</Badge>
                                        </li>
                                    </ul>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>R319 - Symfony</CardTitle>
                                <CardDescription>Travaux en Symfony</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <ul className="flex flex-col items-center gap-1">
                                        <a href="https://github.com/AloneDay-91/mmiple"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 1</h2>
                                                <p className="text-sm text-muted-foreground">MMIPLE</p>
                                            </div>
                                            <div>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center gap-4 overflow-x-scroll">
                                    <p className="text-sm text-muted-foreground">Technologies utilisées : </p>
                                    <ul className="flex items-center gap-1">
                                        <li>
                                            <Badge variant="outline">HTML</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">CSS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">JS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">PHP</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">MySql</Badge>
                                        </li>
                                    </ul>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <div>
                    <p className="text-muted-foreground text-xl py-2 mt-24">
                        Semestre 4
                    </p>
                    <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>R405 - Création et design intéractif</CardTitle>
                                <CardDescription>Travaux en three.js</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <ul className="flex flex-col items-center gap-1">
                                        <a href="/"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 1</h2>
                                                <p className="text-sm text-muted-foreground">Three.js</p>
                                            </div>
                                            <div>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center gap-4 overflow-x-scroll">
                                    <p className="text-sm text-muted-foreground">Technologies utilisées : </p>
                                    <ul className="flex items-center gap-1">
                                        <li>
                                            <Badge variant="outline">HTML</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">CSS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">JS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">Three.js</Badge>
                                        </li>
                                    </ul>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>R407 - Développement back</CardTitle>
                                <CardDescription>Travaux en Symfony</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <ul className="flex flex-col items-center gap-1">
                                        <a href="https://github.com/AloneDay-91/mmiple-S4"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 1</h2>
                                                <p className="text-sm text-muted-foreground">MMIPLE V2</p>
                                            </div>
                                            <div>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center gap-4 overflow-x-scroll">
                                    <p className="text-sm text-muted-foreground">Technologies utilisées : </p>
                                    <ul className="flex items-center gap-1">
                                        <li>
                                            <Badge variant="outline">HTML</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">CSS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">JS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">PHP</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">MySql</Badge>
                                        </li>
                                    </ul>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>R406 - Développement front</CardTitle>
                                <CardDescription>Travaux en Vue.js</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <ul className="flex flex-col items-center gap-1">
                                        <a href="https://github.com/AloneDay-91/vuejsdemo"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 1</h2>
                                                <p className="text-sm text-muted-foreground">Vue.js</p>
                                            </div>
                                            <div>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center gap-4 overflow-x-scroll">
                                    <p className="text-sm text-muted-foreground">Technologies utilisées : </p>
                                    <ul className="flex items-center gap-1">
                                        <li>
                                            <Badge variant="outline">HTML</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">CSS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">JS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">Vue.js</Badge>
                                        </li>
                                    </ul>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>R409 - Unity</CardTitle>
                                <CardDescription>Travaux en Unity</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <ul className="flex flex-col items-center gap-1">
                                        <a href="http://mmi23f03.mmi-troyes.fr/bowling/"
                                           className="w-full border border-1 rounded-lg p-6 hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center justify-between transition duration-200 relative">
                                            <div className="">
                                                <h2 className="uppercase font-semibold">Séquence 1</h2>
                                                <p className="text-sm text-muted-foreground">Bowling</p>
                                            </div>
                                            <div>
                                            </div>
                                            <div className="text-sm text-muted-foreground absolute top-2 right-3">
                                                <SquareArrowOutUpRight fontWeight="1" size={18}/>
                                            </div>
                                        </a>
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center gap-4 overflow-x-scroll">
                                    <p className="text-sm text-muted-foreground">Technologies utilisées : </p>
                                    <ul className="flex items-center gap-1">
                                        <li>
                                            <Badge variant="outline">HTML</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">CSS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">JS</Badge>
                                        </li>
                                        <li>
                                            <Badge variant="outline">Vue.js</Badge>
                                        </li>
                                    </ul>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}