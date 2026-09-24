"use client"

import { createPlan } from "@/services/plans";
import { getSession } from "@/services/session";
import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";

type State = { picture: string; planName: string; address: string; price: string; duration: string; description: string; recomendations: string; errors: Record<string, string> }

    type Action =
        | { type: "SET_FIELD"; field: keyof State; value: string }
        | { type: "SET_ERROR"; field: string; error: string }

    const initialState: State = { picture: "", planName: "", address: "", price: "", duration: "", description: "", recomendations: "", errors: {} }

    function createPlanReducer(state: State, action: Action): State {
        switch (action.type) {
            case "SET_FIELD":
                return { ...state, [action.field]: action.value }
            case "SET_ERROR":
                return {
                    ...state,
                    errors: { ...state.errors, [action.field]: action.error },
                }
            default:
                return state
        }
    }

    function validate(field: string, value: string): string {
        switch (field) {
            case "picture":
                if (!value) return "La imagen es obligatoria"
                return ""
            case "planName":
                if (!value) return "El nombre del plan es obligatorio"
                if (value.length < 2 || value.length > 50) return "El nombre del plan debe tener entre 2 y 50 caracteres"
                return ""
            case "address":
                if (!value) return "La dirección es obligatoria"
                return ""
            case "price":
                if (!value) return "El precio es obligatorio"
                if (isNaN(Number(value))) return "El precio debe ser un número"
                if (Number(value) < 0) return "El precio debe ser mayor a 0"
                return ""
            case "duration":
                if (!value) return "La duración es obligatoria"
                if (isNaN(Number(value))) return "La duración debe ser un número"
                return ""
            case "description":
                if (!value) return "La descripción es obligatoria"
                if (value.length < 600) return "La descripción debe tener al menos 600 caracteres"
                return ""
            case "recomendations":
                if (!value) return "Las recomendaciones son obligatorias"
                return ""
            default:
                return ""
        }
    }

export default function CreatePlanPage() {
    const router = useRouter();
    const session = getSession();


    const [state, dispatch] = useReducer(createPlanReducer, initialState)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    
    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const { name, value } = e.target
        const error = validate(name, value)
        dispatch({ type: "SET_ERROR", field: name, error })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "SET_FIELD",
            field: e.target.name as keyof State,
            value: e.target.value,
        })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await createPlan(
            session.id ?? "",
            state.planName,
            Number(state.price),
            state.address,
            state.picture,
            state.description,
            Number(state.duration),
            state.recomendations
        )
        } catch (err) {
            setError((err as Error).message)
        } finally {
            router.push("/plans")
            setLoading(false)
        }
    }

    

    return(

        <form className="bg-white rounded-2xl shadow-lg p-8 mt-10 w-full max-w-md" onSubmit={handleSubmit}>
            <label htmlFor="picture" className="block text-sm font-semibold text-slate-700">
                Imagen del plan
            </label>
            <input
                id="picture"
                type="text"
                name="picture"
                placeholder="URL de la imagen"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
                value={state.picture}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {state.errors.picture && <p className="text-sm text-red-600 mt-1">{state.errors.picture}</p>}

            <label htmlFor="planName" className="block text-sm font-semibold text-slate-700 mt-4">
                Nombre del plan
            </label>
            <input
                id="planName"
                type="text"
                name="planName"
                placeholder="Nombre del plan"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
                value={state.planName}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {state.errors.planName && <p className="text-sm text-red-600 mt-1">{state.errors.planName}</p>}

            <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mt-4">
                Dirección
            </label>
            <input
                id="address"
                type="text"
                name="address"
                placeholder="Dirección del plan"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
                value={state.address}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {state.errors.address && <p className="text-sm text-red-600 mt-1">{state.errors.address}</p>}

            <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mt-4">
                Precio
            </label>
            <input
                id="price"
                type="text"
                name="price"
                placeholder="Precio del plan"
                className="w-full bg-slate- 50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
                value={state.price}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {state.errors.price && <p className="text-sm text-red-600 mt-1">{state.errors.price}</p>}

            <label htmlFor="duration" className="block text-sm font-semibold text-slate-700 mt-4">
                Duración
            </label>
            <input
                id="duration"
                type="text"
                name="duration"
                placeholder="Duración del plan en minutos"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
                value={state.duration}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {state.errors.duration && <p className="text-sm text-red-600 mt-1">{state.errors.duration}</p>}

            <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mt-4">
                Descripción
            </label>
            <input
                id="description"
                type="text"
                name="description"
                placeholder="Descripción del plan"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
                value={state.description}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {state.errors.description && <p className="text-sm text-red-600 mt-1">{state.errors.description}</p>}

            <label htmlFor="recomendations" className="block text-sm font-semibold text-slate-700 mt-4">
                Recomendaciones
            </label>
            <input
                id="recomendations"
                type="text"
                name="recomendations"
                placeholder="Recomendaciones del plan"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
                value={state.recomendations}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {state.errors.recomendations && <p className="text-sm text-red-600 mt-1">{state.errors.recomendations}</p>}

            <button
                type="submit"
                className="w-full bg-blue-700 text-white font-semibold rounded-xl py-4 mt-8"
            >
                Crear plan
            </button>
            {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
            {loading && <p className="text-sm text-slate-600 mt-4">Creando plan...</p>}

        </form>

    )


}