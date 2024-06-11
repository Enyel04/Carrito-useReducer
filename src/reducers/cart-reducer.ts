import { Guitarra } from "../types";

export type CartAction=
    { type: 'add-to-cart',payload:{item:Guitarra}}|
    {type: 'remove-from-cart',payload:{item:Guitarra['id']}} |
    {type: 'descrementar-cantidad',payload:{item:Guitarra['id']}} |
    {type: 'incrementar-cantidad',payload:{item:Guitarra['id']}} |
    {type: 'clear-cart',payload:{item:Guitarra['id']}} 