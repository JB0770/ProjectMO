

  const deleteButton = document.getElementById('delete');
  deleteButton.addEventListener('click', function(event) {
    event.preventDefault();
    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    modal.show();
  });
