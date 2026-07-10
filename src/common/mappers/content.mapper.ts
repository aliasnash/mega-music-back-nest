export interface ContentItem {
    id: number;
    title: string | null;
    songer: string | null;
    audioFilePath: string | null;
    coverFilePath: string | null;
}

export interface ArtistItem {
    songer: string | null;
    coverFilePath: string | null;
    contentCount: number;
}

export interface PlaylistItem {
    id: number;
    title: string | null;
    description: string | null;
    coverPath: string | null;
    contentCount: number;
}

export interface PlaylistWithCoversItem {
    id: number;
    title: string | null;
    description: string | null;
    contentCount: number;
    randomCovers: (string | null)[];
}

export interface CategoryItem {
    id: number;
    caption: string | null;
}

export interface CategoryInfoItem {
    categoryName: string | null;
    totalRows: number;
}

export function mapContentRowToNewsItem(row: {
    id: number;
    title: string | null;
    songer: string | null;
    audio_file_path: string | null;
    cover_file_path: string | null;
}): ContentItem {
    return {
        id: row.id,
        title: row.title,
        songer: row.songer,
        audioFilePath: row.audio_file_path,
        coverFilePath: row.cover_file_path,
    };
}

export function mapArtistsRowToNewsItem(row: { songer: string | null; cover_file_path: string | null; contentCount: string | number }): ArtistItem {
    return {
        songer: row.songer,
        coverFilePath: row.cover_file_path,
        contentCount: Number(row.contentCount),
    };
}

export function mapPlaylistRowToNewsItem(row: {
    id: number;
    title: string | null;
    description: string | null;
    cover_path: string | null;
    content_count: string | number;
}): PlaylistItem {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        coverPath: row.cover_path,
        contentCount: Number(row.content_count),
    };
}

export function mapPlaylistWithCoversRowToNewsItem(row: {
    id: number;
    title: string | null;
    description: string | null;
    content_count: string | number;
    random_covers: (string | null)[] | null;
}): PlaylistWithCoversItem {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        contentCount: Number(row.content_count),
        randomCovers: row.random_covers ?? [],
    };
}

export function mapCategoriesRowToItems(row: { id: number; caption: string | null }): CategoryItem {
    return {
        id: row.id,
        caption: row.caption,
    };
}

export function mapCategoryInfoRowToItems(row: { category_name: string | null; total_rows: string | number }): CategoryInfoItem {
    return {
        categoryName: row.category_name,
        totalRows: Number(row.total_rows),
    };
}
