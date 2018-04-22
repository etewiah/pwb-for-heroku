class MgmtController < ApplicationController
  # layout 'pwb/admin_panel'
  layout 'mgmt_application'
  def show
    unless current_user && current_user.admin
      render 'pwb/errors/admin_required', layout: "layouts/pwb/admin_panel_error"
    end
  end
end
