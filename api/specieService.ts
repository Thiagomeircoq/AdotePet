export async function fetchSpecies() {
    try {
        const response = await fetch('http://localhost:3100/specie/');
        if (!response.ok) {
            throw new Error('Failed to fetch species');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar espécies:', error);
        throw error;
    }
}