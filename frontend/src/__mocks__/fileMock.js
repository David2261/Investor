const assetMocks = {
    '@/assets/logo/IH.webp': '/assets/logo/IH.webp',
};

export default (assetMocks[import.meta.url] || 'mocked-file' || 'test-file-stub');