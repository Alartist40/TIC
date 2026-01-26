/**
 * PDF Viewer Module
 * 
 * File: scripts/pdf-viewer.js
 * 
 * PDF viewing functionality with Google Docs viewer
 * 
 * Core Features:
 * - Google Document viewer integration
 * - Mobile-optimized PDF viewing
 * - Loading states and error handling
 * - Download functionality
 * - Mobile optimization
 */

// PDF Viewer Module
const PDFViewer = (function() {
    'use strict';
    
    // Configuration
    const config = {
        GOOGLE_VIEWER_URL: 'https://docs.google.com/gview',
        LOADING_TIMEOUT: 3000, // 3 seconds loading state
        MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB max file size
        SUPPORTED_TYPES: ['application/pdf', 'application/x-pdf']
    };
    
    // Private functions
    function showLoadingState(modalId, title) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        const modalContent = document.getElementById('modal-content');
        if (!modalContent) return;
        
        // Show loading state
        modal.style.display = 'flex';
        modalContent.innerHTML = `
            <h3>${title}</h3>
            <div class="modal-loading">
                <p>Loading PDF content...</p>
            </div>
        `;
    }
    
    function showErrorState(modalId, errorMsg) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        const modalContent = document.getElementById('modal-content');
        if (!modalContent) return;
        
        // Show error state
        modalContent.innerHTML = `
            <h3>Error Loading PDF</h3>
            <p class="error">${errorMsg}</p>
            <button class="more-btn" onclick="PDFViewer.closeModal('${modalId}')">Close</button>
        `;
    }
    
    // Public API
    return {
        // Show PDF in modal
        showPDF: function(pdfUrl, title = 'PDF Document') {
            const modalId = 'modal-overlay';
            showLoadingState(modalId, title);
            
            // Validate PDF URL
            if (!pdfUrl) {
                showErrorState(modalId, 'No PDF URL provided');
                return;
            }
            
            // Validate file type
            const fileExtension = pdfUrl.split('.').pop().toLowerCase();
            if (fileExtension !== 'pdf') {
                showErrorState(modalId, 'Invalid file type. Only PDF files are supported.');
                return;
            }
            
            // Set up Google Docs viewer
            const googleViewerUrl = `${config.GOOGLE_VIEWER_URL}?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
            
            // Show Google Docs viewer
            setTimeout(() => {
                const modal = document.getElementById(modalId);
                if (!modal) return;
                
                const modalContent = document.getElementById('modal-content');
                if (!modalContent) return;
                
                // Replace loading state with Google Document viewer
                modalContent.innerHTML = `
                    <h3>${title}</h3>
                    <iframe src="${googleViewerUrl}" 
                            frameborder="0" 
                            width="100%" 
                            height="600px"
                            style="border: none;"
                            allowfullscreen>
                    </a>
                    <div style="margin-top: 1rem; text-align: center;">
                        <a href="${pdfUrl}" 
                           download 
                           class="more-btn">
                           Download PDF
                        </a>
                    </div>
                `;
            }, config.LOADING_TIMEOUT);
        },
        
        // Close modal
        closeModal: function(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;
            
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        },
        
        // Validate PDF URL
        validatePDF: function(pdfUrl) {
            // Check if URL is valid
            try {
                new URL(pdfUrl);
                return true;
            } catch (e) {
                return false;
            }
        }
    };
})();

// Export for browser usage
if (typeof window !== 'undefined') {
    window.PDFViewer = PDFViewer;
}

// Export for Node.js module.exports
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PDFViewer;
}