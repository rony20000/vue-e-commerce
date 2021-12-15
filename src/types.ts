export interface variantSelectAttribteValuesTypes {
    [key: string]: number[]
}

export interface BaseComponentData {
    variantData: variantTypes[]
}

export interface variantTypes {
    id: number 
    title: string
    variant: string
    price: string
    priceVAT: string
    plainTextPriceVat: number
    oldPriceVAT: string 
    originalPrice: string 
    salable: boolean
    inquirable: boolean 
    configuratorUrl: string | null
    code: string 
    unit: string
    guarantee: string
    variantSelectAttributeValues: variantSelectAttribteValuesTypes | [], 
    availability: string 
    tags: string[] | []
}

export interface attributeTypesValues {
    [key: string]: {
        label: string,
        color: string,
        image: string
    }
}

export interface attributeTypes {
    [key: string]: {
        "label": string,
        "values": attributeTypesValues
    }
}
