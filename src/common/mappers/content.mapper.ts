export interface ContentItem {
    id: number;
    title: string | null;
    artist: string | null;
    file: string | null;
    cover: string | null;
}

export interface ArtistItem {
    songer: string | null;
    cover: string | null;
    tracks: number;
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
    tracks: number;
    covers: (string | null)[];
}

export interface CategoryItem {
    id: number;
    caption: string | null;
}

export interface CategoryInfoItem {
    caption: string | null;
    count: number;
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
        artist: row.songer,
        file: row.audio_file_path,
        cover: row.cover_file_path,
    };
}

export function mapArtistsRowToNewsItem(row: { songer: string | null; cover_file_path: string | null; contentCount: string | number }): ArtistItem {
    return {
        songer: row.songer,
        cover: row.cover_file_path,
        tracks: Number(row.contentCount),
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
        tracks: Number(row.content_count),
        covers: row.random_covers ?? [],
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
        caption: row.category_name,
        count: Number(row.total_rows),
    };
}
