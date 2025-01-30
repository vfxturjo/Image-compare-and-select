import { SvelteMap } from 'svelte/reactivity';
import { PersistedStateObjectAdvanced } from './persistedStoreAdvanced.svelte';
import { set, clear, get } from 'idb-keyval';
import { setSelectionState } from './utils.svelte';

export interface foundFile {
	handle: FileSystemFileHandle;
	name: string;
	url: string;
}

export interface foundPair {
	[key: string]: {
		baseName: string;
		url: string;
		name: string;
	};
	// baseName: string;
	// v1?: foundFile;
	// v2?: foundFile;
}

const defaultAppSettings = {
	v1DirPath: '',
	v2DirPath: '',
	v1DirName: 'Dir1',
	v2DirName: 'Dir2',
	otherDirs: {
		convOut: ''
	},
	defaultSelection: 'v1',
	itemsPerPage: 20,
	thumbnailSize: 50,
	spacing: 10,
	dirsOk: false,
	imageFullscreenView: true,
	showNameInInfoBar: false
};

export const AppSettings = new PersistedStateObjectAdvanced('app-settings', defaultAppSettings, {
	syncTabs: false
});

// App state
export const AppState = $state({
	v1DirFileSysHandle: null as FileSystemDirectoryHandle | null,
	v2DirFileSysHandle: null as FileSystemDirectoryHandle | null,
	imagePairsAll: [] as foundPair[],
	imagePairsHeic: [] as foundPair[],
	imagePairs: [] as foundPair[],
	v1Len: 0,
	v2Len: 0,
	overlaps: 0,
	selections: new SvelteMap(),
	currentPage: 1,
	status: { v1: 0, v2: 0 },
	heicCount: 0,
	whichFolderHeic: 'v1',
	currentPair: null as foundPair | null,
	layout: {
		topBar: 56,
		bottomBar: 24,
		bodyArea: 0,
		svelteInnerHeight: 0,
		largeViewImgHeight: 0
	},
	currentPairID: 0,
	bottomBar: {
		show: false,
		statusText: '',
		showId: true
	},
	converter: {
		inputDirFileSysHandle: null as FileSystemDirectoryHandle | null,
		jpegQuality: 80,
		outputDirFileSysHandle: null as FileSystemDirectoryHandle | null,
		progress: 0,
		startTime: 0
	}
});

export function saveFileSysHandle(key: string, handle: FileSystemDirectoryHandle | null) {
	if (!handle) {
		console.log('no handle to save');
		return;
	}

	// console.log('saving handle', handle);
	set(key, handle);
}

export async function getFileSysHandles() {
	return {
		v1: (await get('v1')) as FileSystemDirectoryHandle,
		v2: (await get('v2')) as FileSystemDirectoryHandle
	};
}

export function resetAllSettings() {
	localStorage.clear();
	clear();
	location.reload();
}

export function handleKeyboardEvent(key: string) {
	switch (key) {
		case 'Space':
		case 'Numpad6':
			// Show next pair
			getPairRelative(1);
			break;
		case 'Numpad4':
			// Show previous pair
			getPairRelative(-1);
			break;
		case 'Numpad1':
		case 'KeyA':
			// Select v1 and show next pair
			if (AppState.currentPair?.baseName) {
				setSelectionState(AppState.currentPair?.baseName, 'v1');
				getPairRelative(1);
			}
			break;
		case 'Numpad3':
		case 'KeyD':
			// Select v2 and show next pair
			if (AppState.currentPair?.baseName) {
				setSelectionState(AppState.currentPair?.baseName, 'v2');
				getPairRelative(1);
			}
			break;
		case 'NumpadSubtract':
			setSelectionState(AppState.currentPair?.baseName, 'none');
			break;
		default:
			break;
	}
}

function getPairRelative(relPos: number) {
	if (!AppState.imagePairs) {
		return;
	}

	const currentIndex = AppState.imagePairs.indexOf(AppState.currentPair!);
	if (currentIndex < AppState.imagePairs.length - relPos) {
		AppState.currentPair = AppState.imagePairs[currentIndex + relPos];
	} else {
		console.log('No more pairs to show');
	}
}

export function mouseMoveHandler(e: MouseEvent) {
	AppState.bottomBar.statusText =
		(e.target as HTMLDivElement).getAttribute('data-infobar') ??
		((e.target as HTMLDivElement).parentNode as HTMLElement)?.getAttribute('data-infobar') ??
		((e.target as HTMLDivElement).parentNode as HTMLElement)?.parentElement?.getAttribute(
			'data-infobar'
		) ??
		'';
}
