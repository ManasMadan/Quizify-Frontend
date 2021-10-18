// Show When Loading Redux State Is Set To False
export default function Loading() {
  return (
    // Overlay
    <div id="overlay">
      {/* Spinner */}
      <div class="spinner-border text-primary" role="status" id="spinner">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
